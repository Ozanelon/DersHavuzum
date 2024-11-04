// Firebase projenizi buraya yapılandırın
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
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
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Formun varsayılan gönderimini engelle

    const schoolNumber = document.getElementById('login-school-number').value;
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const isRegistered = await checkSchoolNumber(schoolNumber);
        if (!isRegistered) {
            alert('Sistemimizde bu okul numarası kayıtlı değil!');
            return;
        }

        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log('Giriş başarılı:', userCredential.user);
        alert('Giriş başarılı!');
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error('Giriş hatası:', error);
        alert('Giriş başarısız! Lütfen e-posta ve şifrenizi kontrol edin.');
    }
});

// Okul numarasının Firestore'da var olup olmadığını kontrol eden fonksiyon
async function checkSchoolNumber(schoolNumber) {
    try {
        const querySnapshot = await db.collection("users").where("schoolNumber", "==", schoolNumber).get();
        return !querySnapshot.empty;
    } catch (error) {
        console.error("Okul numarası kontrol hatası: ", error);
        return false;
    }
}