import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDdtDMFd2ofvezYKsI4Is4DnDE_GDe0Yg4",
    authDomain: "socialfirebaseapp.firebaseapp.com",
    databaseURL: "https://socialfirebaseapp.firebaseio.com ",
    projectId: "socialfirebaseapp",
    storageBucket: "socialfirebaseapp.appspot.com",
    messagingSenderId: "669193157155",
    appId: "1: 669193157155: web: 3977061eb9471840b14f96"
}; 

class Fire {
    
    constructor() {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig)
        }
        
    }

    addPost = async (text, localUri) => {
        const remoteUri = await this.uploadPhotoAsync(localUri);

        return new Promise((res, rej) => {
            this.firestore
                .collection("posts")
                .add({
                    text,
                    uid: this.uid,
                    timestamp: this.timestamp,
                    image: remoteUri
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error)
                });
        });
    };

    uploadPhotoAsync = async uri => {
        const path = `photo/${this.uid}/${Date.now()}.jpg`;

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase.storage().ref(path).put(file);

            upload.on(
                "state_changed",
                snapshot => { },
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        })
    }

    get firestore() {
        return firebase.firestore()
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

    get timestamp() {
        return Date.now()
    }
}

Fire.shared = new Fire()

export default Fire;