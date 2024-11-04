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

// Kayıt olma işlemi
document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Formun varsayılan gönderimini engelle

    const name = document.getElementById('signup-name').value;
    const surname = document.getElementById('signup-surname').value;
    const schoolNumber = document.getElementById('signup-school-number').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    try {
        const isAvailable = await checkSchoolNumber(schoolNumber);
        if (!isAvailable) {
            alert('Bu okul numarası zaten kayıtlı! Lütfen başka bir numara girin.');
            return;
        }

        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await db.collection("users").doc(user.uid).set({
            name: name,
            surname: surname,
            schoolNumber: schoolNumber,
            email: email
        });

        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
        window.location.href = "index.html"; // Kullanıcının gideceği sayfa
    } catch (error) {
        console.error('Hata:', error);
        alert('Kayıt başarısız! Lütfen bilgilerinizi kontrol edin.');
    }
});

// Okul numarasının Firestore'da var olup olmadığını kontrol eden fonksiyon
async function checkSchoolNumber(schoolNumber) {
    try {
        const querySnapshot = await db.collection("users").where("schoolNumber", "==", schoolNumber).get();
        return querySnapshot.empty; // Eğer boşsa, okul numarası yoktur
    } catch (error) {
        console.error("Okul numarası kontrol hatası: ", error);
        return false; // Hata durumunda false döndür
    }
}