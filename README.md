# Project Setup and Run Guide

This repository contains two folders:  
- `frontend`  
- `backend`

---

## Prerequisites

- Node.js installed (v16+ recommended)  
- npm (comes with Node.js)

---

## Setup

### 1. Create `.env` files

For both `frontend` and `backend`, you need to create a `.env` file:  

- Copy the contents from `dist.env` (provided in each folder)  
- Paste into a new `.env` file in the same folder

---

### 2. Install dependencies

Run this command in **both** folders:

```bash
cd frontend
npm install

cd ../backend
npm install
```

---

### 3. Run the project

Start frontend and backend servers separately:

```bash
cd frontend
npm run dev

cd ../backend
npm run dev
```