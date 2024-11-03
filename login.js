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

// Giriş olma işlemi
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Formun varsayılan gönderimini engelle

    const schoolNumber = document.getElementById('login-school-number').value;
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Okul numarası kontrolü
    checkSchoolNumber(schoolNumber)
        .then(isRegistered => {
            if (!isRegistered) {
                alert('Sistemimizde bu okul numarası kayıtlı değil!'); // Kullanıcı sistemde yok
                return; // Giriş işlemini durdur
            }

            // Kullanıcı girişi
            auth.signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Giriş başarılı
                    console.log('Giriş başarılı:', userCredential.user);
                    alert('Giriş başarılı!'); 
                    // Giriş sonrası yönlendirme
                    window.location.href = "dashboard.html"; // Kullanıcının gideceği sayfa
                })
                .catch((error) => {
                    console.error('Hata:', error);
                    alert('Giriş başarısız! Lütfen e-posta ve şifrenizi kontrol edin.');
                });
        });
});

// Okul numarasının Firestore'da var olup olmadığını kontrol eden fonksiyon
function checkSchoolNumber(schoolNumber) {
    return db.collection("users").where("schoolNumber", "==", schoolNumber).get()
        .then((querySnapshot) => {
            return !querySnapshot.empty; // Eğer doluysa, okul numarası vardır
        })
        .catch((error) => {
            console.error("Okul numarası kontrol hatası: ", error);
            return false; // Hata durumunda false döndür
        });
}
