import Styles from "./AppLoader.module.css";

interface AppLoaderProps {
  text?: string;
}

export default function AppLoader({text}: AppLoaderProps) {
  return (
  <div className={`${Styles['app-loader-loader']}`}>
    <div className={`${Styles['app-loader-loader__spinner']}`}></div>
    <p className={`${Styles['app-loader-loader__text']}`}>
      {text || "Cargando..."}
    </p>
  </div>
  )
}
