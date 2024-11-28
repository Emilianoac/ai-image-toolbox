import Styles from "./AppLoader.module.css";

interface AppLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  includeBackground?: boolean;
}

export default function AppLoader({className,text, includeBackground = true}: AppLoaderProps) {
  return (
  <div 
    className={`
      ${Styles['app-loader-loader']} 
      ${!includeBackground && "!bg-transparent !backdrop-filter-none"}
      ${className ?? ""}`
    }>
    <div className={`${Styles['app-loader-loader__spinner']}`}></div>
    <p className={`${Styles['app-loader-loader__text']}`}>
      {text || "Cargando..."}
    </p>
  </div>
  )
}
