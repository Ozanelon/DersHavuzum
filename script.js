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

// Giriş yapma fonksiyonu
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Formun varsayılan gönderimini engelle

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const schoolNumber = document.getElementById('school-number').value;

    // Burada, kullanıcı bilgilerini kullanarak bir kullanıcı girişi yapabilirsiniz
    // Örneğin, email ve password ile giriş
    const email = `${name}.${surname}@okul.com`; // Basit bir email oluşturma
    const password = schoolNumber; // Okul numarasını şifre olarak kullanma

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Giriş başarılı
            const user = userCredential.user;
            console.log('Giriş başarılı:', user);
            alert('Giriş başarılı!');
            // Kullanıcıyı yönlendirme
            window.location.href = "dashboard.html"; // Kullanıcının gideceği sayfa
        })
        .catch((error) => {
            console.error('Hata:', error);
            alert('Giriş başarısız! Lütfen bilgilerinizi kontrol edin.');
        });
});

// Kayıt olma işlemi
document.getElementById('signup-link').addEventListener('click', function() {
    // Kayıt olma işlemi için yönlendirme
    alert('Kayıt olma işlemi henüz yapılandırılmadı.');
});
