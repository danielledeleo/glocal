package main

import (
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"io"
	// "net"
	"net/http"
)

type role uint16

const (
	Admin   role = 1 << iota // 1
	Trusted role = 1 << iota // 2
	Guest   role = 1 << iota // 4
)

type userStatus uint16

const (
	Connected  userStatus = 1 << iota
	Away       userStatus = 1 << iota
	VoiceMuted userStatus = 1 << iota
	SoundMuted userStatus = 1 << iota
)

type User struct {
	Host     string
	Role     role
	Nickname string
	Identity // todo: public key auth
}

func (u User) MarshallJSON() ([]byte, error) {
	return json.Marshal(map[string]interface{}{
		"user":  u.Host,
		"role":  u.Role,
		"nick":  u.Nickname,
		"ident": u.FingerprintBase64(),
	})
}

type Identity struct {
	publicKey string
}

func (i Identity) Fingerprint() [32]byte {
	return sha256.Sum256([]byte(i.publicKey))
}

func (i Identity) FingerprintBase64() string {
	fingerprint := i.Fingerprint()
	var s []byte
	s = fingerprint[:]
	return base64.StdEncoding.EncodeToString(s)
}

type Channel struct {
	Users     map[Identity]userStatus
	Title     string
	Details   string
	Operators []Identity
}

type Server struct {
	Host  string
	Title string
	Identity
}

type localState struct {
	Server
	servers  []*Server
	channels []*Channel
	clients  []*User
}

func newLocalState(ip, title, publickey string) (x *localState) {
	x = &localState{Server: Server{"12.13.14.15", "US-EAST", Identity{"hello I am a public key"}}}
	x.servers = make([]*Server, 4)
	x.clients = make([]*User, 4)
	x.channels = make([]*Channel, 4)

	return
}

var server *localState

func main() {
	server = newLocalState("0.0.0.0", "Toronto", "blah blah blah")

	router := mux.NewRouter()

	x := User{"1.2.3.4", Trusted, "Jagger", Identity{"yeahhh"}}

	fmt.Println(x.FingerprintBase64())
	fmt.Printf("%x\n", x.Fingerprint())
	fmt.Printf("Server: %x\n", server.Fingerprint())
	fmt.Printf("Server (b64): %s\n", server.FingerprintBase64())

	router.HandleFunc("/", func(rw http.ResponseWriter, req *http.Request) {
		fmt.Fprintf(rw, "what's up? you just hit the server\n")
	})

	router.HandleFunc("/getserver", func(rw http.ResponseWriter, req *http.Request) {
		enc := json.NewEncoder(rw)
		enc.Encode(x)
	})

	api := router.PathPrefix("/api/v1").Subrouter()

	api.HandleFunc("/text", func(rw http.ResponseWriter, req *http.Request) {
		fmt.Println(req.URL.String(), req.RemoteAddr)

		io.WriteString(rw, "sup\n")
	})

	fmt.Println("Starting server on :19000")
	http.ListenAndServe(":19000", router)

}
