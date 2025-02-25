# 🚀 Pokémon Explorer  

Pokémon Explorer is a web application that allows users to browse and search for Pokémon.  
It uses **Next.js** for server-side rendering and static generation, along with **TailwindCSS** for styling.  

---

## ⚙️ Installation & Setup  

### 1⃣ Clone the Repository  
```sh
cd pokemon-explorer
```

### 2⃣ Install Dependencies  
Make sure you have Node.js and npm installed. Then, run:  

```sh
npm install
```

### 3⃣ Run the Development Server  
```sh
npm run dev
```
Your app will be available at [http://localhost:3000](http://localhost:3000) 🚀.  

---

## 🛠️ Functionalities  

### 🌐 Home Page (`/`)  
✅ Displays a list of 151 Pokémon fetched from the PokéAPI.  
✅ Allows searching for Pokémon by name.  
✅ Clicking a Pokémon card navigates to the detail page.  

### 📄 Pokémon Detail Page (`/pokemon/[id]`)  
✅ Displays Pokémon name, image, type, abilities, and stats.  
✅ Uses Next.js Static Generation (SSG) for fast performance.  
✅ Supports dynamic routes (e.g., `/pokemon/1`, `/pokemon/2`).  

---

## 🎨 Tech Stack  
- ⚡ **Next.js** – Static Generation & API Fetching  
- 🎨 **TailwindCSS** – Modern Styling  
- 🔍 **TypeScript** – Strongly-typed code  
- 🎮 **PokéAPI** – External Pokémon data source  

---

## 🚀 Deployment  

### 📦 Build for Production  
```sh
npm run build
npm run start
```

## 💡 Enjoy Exploring Pokémon! 🚀🎮
