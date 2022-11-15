import { useEffect, useState } from "react";
import UploadBanner from "../components/uploadBanner";
import UploadImage from "../components/uploadImage";
import tailwindConfig from "../tailwind.config";
import { themeChange } from "theme-change";
import { ThemeSend, User } from "../lib/types";
import { useSession } from "next-auth/react";
export type DaisyUIThemeType = {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  "base-100": string;
  info: string;
  success: string;
  warning: string;
  error: string;
};

async function sendTheme(sendingPackage: ThemeSend) {
  const response = await fetch("../api/userCalls/setUserTheme", {
    method: "POST",
    body: JSON.stringify(sendingPackage),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export default function Index() {
  const themes = tailwindConfig.daisyui.themes;
  console.log(themes);
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  const styleThemes: string[] = [];

  themes.map((theme: string | object) => {
    if (typeof theme === "string") {
      styleThemes.push(theme);
    } else if (typeof theme === "object") {
      // handle custom theme keys
      const customThemeKeys = Object.keys(theme);
      if (Array.isArray(customThemeKeys)) {
        styleThemes.push(...customThemeKeys);
      }
    }
  });
  const [user, setUser] = useState<User>();

  const { data: session } = useSession();
  const userId = parseInt(session?.user?.name?.toString()!);
  const [userTheme, setUserTheme] = useState<ThemeSend>({
    id: userId,
    theme: "dark",
  });
  useEffect(() => {
    fetch(`./api/findUser/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await sendTheme(userTheme);
      console.log("success!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <section>Select layout : </section>
      <form onSubmit={handleSubmit}>
        <select
          className="text-primary"
          data-choose-theme
          onChange={(event) =>
            setUserTheme((prevState) => {
              return { ...prevState, theme: event.target.value };
            })
          }
        >
          <option className="text-primary" value={user?.theme}></option>
          {styleThemes.map((theme: any) => {
            return (
              <option className="text-primary" key={theme} value={theme}>
                {theme}
              </option>
            );
          })}
        </select>
        <button>Set Theme</button>
      </form>
    </main>
  );
}
