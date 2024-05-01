# Todo Application with React Native, Node.js/Express, Prisma, and Postgres

This is a Todo Application built using React Native for the mobile app and Node.js/Express for the backend, with Prisma as the ORM and Postgres as the database.

## Mobile App Setup

To run the mobile app locally, you need Java 17, Node 18 (or higher), and the React Native setup. Follow these steps:

1. Clone the repository.
2. Navigate to the `/app` directory.
3. Run `npm install` to install dependencies.
4. Start the React Native Metro bundler with `npx react-native start`.
5. Run the app on an Android emulator or device with `npx react-native run-android`.

## Backend Setup

For the backend, you need Node.js 18 (or higher). Follow these steps:

1. Navigate to the `/server` directory.
2. Copy `.env.example` to `.env` and set your database URL.
3. Run `npm install` to install dependencies.
4. Generate Prisma data queries with `npx prisma generate`.
5. Sync the database with `npx prisma db push`.
6. Use `npm run dev` for development and `npm run build` to compile TypeScript to JavaScript (compiled code available at `src/dist`).

## APK Download Link

Download the APK from [Google Drive](https://drive.google.com/file/d/1-oP1XMDtM5_M3BW7P8shbL6Z82RWxsXn/view?usp=sharing).
