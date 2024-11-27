import Styles from "./AppLoader.module.css";

interface AppLoaderProps {
  text?: string;
  includeBackground?: boolean;
}

export default function AppLoader({text, includeBackground = true}: AppLoaderProps) {
  return (
  <div className={`${Styles['app-loader-loader']} ${!includeBackground && "!bg-transparent"}`}>
    <div className={`${Styles['app-loader-loader__spinner']}`}></div>
    <p className={`${Styles['app-loader-loader__text']}`}>
      {text || "Cargando..."}
    </p>
  </div>
  )
}
