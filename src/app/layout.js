import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "QUIZ APP",
  description: "FN1 Lesson 39 Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <StoreProvider>
        <body
          className={`${poppins.variable} font-poppins antialiased dark:bg-background dark:text-foreground bg-foreground text-background`}
        >
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
