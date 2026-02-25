# 🛡️ Phishing Website Detection System

### 🚀 Machine Learning + Flask + Live Deployment

🌐 **Live Demo:** [https://phishing012.netlify.app/](https://phishing012.netlify.app/)

---

## 📌 Project Overview

Phishing is one of the most dangerous cyber threats, where attackers create fake websites to steal sensitive information like passwords, banking details, and personal credentials.

This project is an **AI-powered Phishing Website Detection System** that uses **Machine Learning + URL feature analysis** to detect whether a website is:

* ✅ Legitimate
* ❌ Phishing

The system is deployed online and accessible via a live web interface.

---

## 🌍 Live Application

🔗 **Deployed Link:**
👉 [https://phishing012.netlify.app/](https://phishing012.netlify.app/)

Users can:

* Enter any website URL
* Instantly check phishing probability
* Get real-time prediction results

---

## ✨ Key Features

* 🔎 Real-time URL scanning
* 🤖 Machine Learning-based classification
* 📊 Probability score display
* 🌐 Clean & responsive UI
* 🔐 Cybersecurity-focused solution
* ☁️ Live deployment on Netlify
* 🔌 Optional Google Safe Browsing API integration

---

## 🧠 System Architecture

User Input → Feature Extraction → ML Model → Prediction → Web Interface

---

## 🛠️ Tech Stack

### 🔹 Backend

* Python
* Flask
* Scikit-learn
* Pandas
* NumPy

### 🔹 Frontend

* HTML5
* CSS3
* JavaScript

### 🔹 Deployment

* Netlify (Frontend Hosting)
* Flask Backend (API)

---

## 📂 Project Structure

```
Phishing-Website-Detection/
│
├── app.py
├── model.pkl
├── feature_extraction.py
├── requirements.txt
│
├── templates/
│   └── index.html
│
├── static/
│   └── style.css
│
└── README.md
```

---

## 🧪 How It Works

1️⃣ User enters a URL
2️⃣ System extracts important phishing-related features:

* URL length
* Presence of special symbols (@, -, etc.)
* Number of subdomains
* HTTPS usage
* Suspicious keywords
  3️⃣ Features are passed to trained ML model
  4️⃣ Model returns prediction:
* `0` → Legitimate
* `1` → Phishing
  5️⃣ Result is displayed instantly

---

## 📊 Machine Learning Model

* Algorithm Used: Logistic Regression / Random Forest
* Dataset: Phishing Website Dataset
* Model Accuracy: (Add your actual accuracy here)
* Evaluation Metrics:

  * Accuracy
  * Precision
  * Recall
  * F1 Score

---

## ⚙️ Installation Guide (Local Setup)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Neeraj29118/Phishing-Website-Detection.git
cd Phishing-Website-Detection
```

### 2️⃣ Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate
```

Windows:

```
venv\Scripts\activate
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Run Flask App

```bash
python app.py
```

Open:

```
http://127.0.0.1:5000/
```

---

## 🔐 Google Safe Browsing API Integration (Optional)

If using Google Safe Browsing:

1. Enable API in Google Cloud Console
2. Generate API Key
3. Remove API restrictions OR allow Safe Browsing API
4. Add key in `app.py`

---

## 🚀 Future Enhancements

* 🧠 Deep Learning-based phishing detection
* 🌍 WHOIS Domain lookup integration
* 📊 Admin analytics dashboard
* 🛡️ Browser extension version
* ☁️ Full cloud deployment with backend hosting

---

## 🎯 Why This Project Is Important

* Solves real-world cybersecurity problem
* Demonstrates ML + Web integration
* Shows deployment & API handling skills
* Suitable for internships & cybersecurity roles

---

## 👨‍💻 Author

**Neeraj Upadhayay**
🎓 B.Tech Cybersecurity Student
💻 Machine Learning & Security Developer

🔗 LinkedIn: [https://www.linkedin.com/in/neeraj-upadhayay-2nd-a0958a246](https://www.linkedin.com/in/neeraj-upadhayay-2nd-a0958a246)
🐙 GitHub: [https://github.com/Neeraj29118](https://github.com/Neeraj29118)

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 🤝 Contribute


Tell me which one you want next, Neeraj 🚀
