// Firebase projenizi buraya yapılandırın
const firebaseConfig = {
    apiKey: "AIzaSyB6fpJAcVA7Ms-3C9ly4YDksuuu6Ue6puw",
    authDomain: "dershavuzum-e1074.firebaseapp.com",
    projectId: "dershavuzum-e1074",
    storageBucket: "dershavuzum-e1074.appspot.com",
    messagingSenderId: "598119515571",
    appId: "1:598119515571:web:6d597491ced0418e9e37c6"
};

// Firebase'i başlat
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); // Firestore'u başlat

// Kayıt olma işlemi
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Formun varsayılan gönderimini engelle

    const name = document.getElementById('signup-name').value;
    const surname = document.getElementById('signup-surname').value;
    const schoolNumber = document.getElementById('signup-school-number').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Okul numarasını kontrol et
    checkSchoolNumber(schoolNumber)
        .then(isAvailable => {
            if (!isAvailable) {
                alert('Bu okul numarası zaten kayıtlı! Lütfen başka bir numara girin.');
                return; // Kayıt işlemini durdur
            }

            // Kullanıcı kaydı işlemi
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Kayıt başarılı
                    const user = userCredential.user;

                    // Okul numarasını Firestore'a kaydet
                    db.collection("users").doc(user.uid).set({
                        name: name,
                        surname: surname,
                        schoolNumber: schoolNumber,
                        email: email
                    })
                    .then(() => {
                        console.log('Kullanıcı bilgileri Firestore\'a kaydedildi:', user);
                        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
                        // Kayıt sonrası yönlendirme
                        window.location.href = "index.html"; // Kullanıcının gideceği sayfa
                    });
                })
                .catch((error) => {
                    console.error('Hata:', error);
                    alert('Kayıt başarısız! Lütfen bilgilerinizi kontrol edin.');
                });
        });
});

// Okul numarasının Firestore'da var olup olmadığını kontrol eden fonksiyon
function checkSchoolNumber(schoolNumber) {
    return db.collection("users").where("schoolNumber", "==", schoolNumber).get()
        .then((querySnapshot) => {
            return querySnapshot.empty; // Eğer boşsa, okul numarası yoktur
        })
        .catch((error) => {
            console.error("Okul numarası kontrol hatası: ", error);
            return false; // Hata durumunda false döndür
        });
}
