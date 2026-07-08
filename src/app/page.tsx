import { redirect } from "next/navigation";

export default function Home() {
  // MVP demo: arahkan langsung ke etalase desa percontohan.
  redirect("/desa/durian");
}
