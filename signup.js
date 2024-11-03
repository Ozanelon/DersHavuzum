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

// Kayıt olma işlemi
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Formun varsayılan gönderimini engelle

    const name = document.getElementById('signup-name').value;
    const surname = document.getElementById('signup-surname').value;
    const schoolNumber = document.getElementById('signup-school-number').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Okul numarası doğrulama
    if (!isValidSchoolNumber(schoolNumber)) {
        alert('Geçersiz okul numarası! Lütfen yalnızca rakamlardan oluşan bir numara girin.');
        return; // Kayıt işlemini durdur
    }

    // Kullanıcı kaydı işlemi
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Kayıt başarılı
            const user = userCredential.user;
            console.log('Kayıt başarılı:', user);
            alert('Kayıt başarılı! Giriş yapabilirsiniz.');
            // Kayıt sonrası yönlendirme
            window.location.href = "index.html"; // Kullanıcının gideceği sayfa
        })
        .catch((error) => {
            console.error('Hata:', error);
            alert('Kayıt başarısız! Lütfen bilgilerinizi kontrol edin.');
        });
});


// Okul numarasının geçerli olup olmadığını kontrol eden fonksiyon
function isValidSchoolNumber(schoolNumber) {
    const schoolNumberPattern = /^[0-9]+$/; // Sadece rakamlardan oluşmalı
    return schoolNumberPattern.test(schoolNumber);
}