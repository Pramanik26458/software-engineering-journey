import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import UserLayout from "@/layout/userLayout/UserLayout";

export default function Home() {
  const router = useRouter();

  return (
    <UserLayout>
      <Head>
        <title>True Social</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContainer__left}>
            <p>Connect with Friends without Exaggeration</p>

            <p>
              A <i><b>True</b></i> social media platform, with stories no blufs!
            </p>

            <div
              className={styles.buttonJoin}
              onClick={() => router.push("/login")}
            >
              <p>Join Now</p>
            </div>
          </div>

          <div className={styles.mainContainer__right}>
            <img
              src="/images/social.png"
              alt="True Social Connection Illustration"
              width="100%"
            />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}