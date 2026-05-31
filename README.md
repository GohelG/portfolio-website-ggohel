````markdown id="aj4w3m"
# 🚀 Gautam Gohel Portfolio Website

A modern static portfolio website designed for showcasing professional experience, cloud operations expertise, DevOps projects, certifications, and technical skills.

This project is built using pure HTML, CSS, and JavaScript and can be easily deployed on GitHub Pages, AWS EC2, Nginx, Netlify, or Cloudflare Pages.

---

# 📌 Features

- Responsive static portfolio website
- Multi-page layout
- Clean modern UI
- Resume download support
- Project showcase section
- Contact information page
- Skills and experience highlights
- Easy deployment on cloud platforms

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript | Client-side functionality |
| GitHub | Version Control |
| AWS EC2 | Hosting |
| Nginx | Web Server |

---

# 📂 Folder Structure

```text
portfolio-website/
│
├── index.html
├── about.html
├── projects.html
├── contact.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── assets/
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── project1.png
│   │   └── project2.png
│   │
│   ├── icons/
│   │   ├── aws.png
│   │   ├── azure.png
│   │   └── gcp.png
│   │
│   ├── resume/
│   │   └── CV.pdf
│   │
│   └── videos/
│       └── demo.mp4
│
└── README.md
````

---

# 🌐 Website Pages

## 🏠 Home Page (`index.html`)

Contains:

* Introduction
* Hero section
* Resume download button
* Navigation menu

---

## 👨‍💻 About Page (`about.html`)

Contains:

* Professional summary
* Technical skills
* Experience overview

---

## 🚀 Projects Page (`projects.html`)

Contains:

* Featured DevOps projects
* Monitoring & cloud operations projects
* CI/CD deployment project showcase

---

## 📞 Contact Page (`contact.html`)

Contains:

* Email address
* Phone number
* Location
* Social profile links

---

# ⚡ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/portfolio-website-ggohel.git
```

---

## 2️⃣ Open Project

```bash
cd portfolio-website-ggohel
```

---

## 3️⃣ Run Website Locally

Simply open:

```text
index.html
```

in your browser.

---

# ☁️ Deployment Options

You can deploy this portfolio on:

* GitHub Pages
* AWS EC2 + Nginx
* Netlify
* Vercel
* Cloudflare Pages

---

# 🚀 Deploy on AWS EC2

## Install Nginx

```bash
sudo apt update
sudo apt install nginx -y
```

---

## Copy Files

```bash
sudo cp -r * /var/www/html/
```

---

## Restart Nginx

```bash
sudo systemctl restart nginx
```

---

## Access Website

```text
http://<EC2_PUBLIC_IP>
```

---

# 🔒 Security Best Practices

* Use HTTPS with SSL certificates
* Restrict SSH access using Security Groups
* Keep server packages updated
* Use GitHub Secrets for deployment automation

---

# 📈 Future Improvements

* Add dark/light theme toggle
* Add animations using JavaScript
* Integrate contact form backend
* Add blog section
* Dockerize the application
* Add CI/CD pipeline with GitHub Actions

---

# 👨‍💻 Author

## Gautam Gohel

Cloud Operations | System Administrator | DevOps Engineer

📍 Ahmedabad, India

📧 [gautam.gohil658@gmail.com](mailto:gautam.gohil658@gmail.com)

---

# 📜 License

This project is open-source and available for learning and portfolio purposes.

```
```