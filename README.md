# NexaBank — Angular 19 Banking Web Application

A full-featured banking web application built with Angular 19, Angular Material, and Bootstrap 5. Supports two roles — **Customer** and **Banker** — with role-based access control, loan application management, and a responsive UI.

---

## Features

### Customer
- Register and log in as a Customer
- Apply for a loan with personal, financial, and existing loan details
- View the status of their own loan applications (Pending / Approved / Rejected)

### Banker
- Register and log in as a Banker
- View all loan applications submitted by customers
- Inspect full application details via a dialog modal

---

## Tech Stack

| Technology | Version |
|---|---|
| Angular | 19.2 |
| Angular Material | 19.2 |
| Bootstrap | 5.3 |
| RxJS | 7.8 |
| TypeScript | 5.7 |

---

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/        # authGuard, noGuard
│   │   ├── models/        # auth.model.ts, loan.model.ts
│   │   └── services/      # authservice.service.ts
│   ├── features/
│   │   ├── home/          # Landing page
│   │   ├── auth/          # Login & Register
│   │   ├── apply-loan/    # Loan application form
│   │   └── applications/  # View applications + dialog
│   ├── shared/
│   │   └── component/navbar/
│   ├── app.routes.ts
│   └── app.config.ts
└── environments/
    ├── environment.ts       # Development
    └── environment.prod.ts  # Production
```

---

## Getting Started

### Prerequisites
- Node.js >= 18
- Angular CLI >= 19

```bash
npm install -g @angular/cli
```

### Installation

```bash
git clone https://github.com/your-username/bankwebsite.git
cd bankwebsite
npm install
```

### Run Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200`

### Build for Production

```bash
ng build
```

Output is in the `dist/bankwebsite/` folder.

---

## Routes

| Path | Access | Description |
|---|---|---|
| `/home` | Public | Landing page |
| `/register` | Guest only | Login / Register toggle |
| `/apply-loan` | Customer only | Loan application form |
| `/applications` | Logged in | View loan applications |

---

## Environment Configuration

API base URL is configured via environment files:

- `src/environments/environment.ts` — development
- `src/environments/environment.prod.ts` — production

To point to a different API, update `apiUrl` in those files.

---

## Backend API

This project connects to a shared demo API at `https://api.freeprojectapi.com`.

Key endpoints used:
- `POST /api/BankLoan/login`
- `POST /api/BankLoan/RegisterCustomer`
- `POST /api/BankLoan/RegisterAsBankUser`
- `POST /api/BankLoan/AddNewApplication`
- `GET  /api/BankLoan/GetAllApplications`
- `GET  /api/BankLoan/GetMyApplications?customerId={id}`

---

## License

This project is for educational purposes.
