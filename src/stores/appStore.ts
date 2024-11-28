
import { createStore } from "zustand/vanilla";

export type GenerateImageState = {
  formData: {
    prompt: string
    negative: string
    steps: number
    seed: number
  }
  result: string | undefined
  loading: boolean
}

export type ImageTo3dState = {
  originalImage: File | undefined
  result: string | undefined
  currentLight: number
  loading: boolean,
}

export type RemoveBackgroundState = {
  originalImage: string | undefined
  result: string | undefined
  loading: boolean
  imageDimensions: {
    width: number
    height: number
  }
}

export type AppState = {
  generateImageState: GenerateImageState
  imageTo3dState: ImageTo3dState
  removeBackgroundState: RemoveBackgroundState
}

export type GenereateImageActions = {
  updateResult: (result: string) => void
  updateLoading: (loading: boolean) => void
  updateFormData: (newData: GenerateImageState['formData']) => void
}

export type ImageTo3dActions = {
  updateOriginalImage: (originalImage: ImageTo3dState['originalImage']) => void
  update3dResult: (result: ImageTo3dState['result']) => void
  update3dLoading: (loading: boolean) => void
  updateCurrentLight: (currentLight: number) => void
}

export type RemoveBackgroundActions = {
  upadteRBResult: (result: RemoveBackgroundState['result']) => void
  updateRBLoading: (loading: boolean) => void
  updateRBOriginalImage: (originalImage: RemoveBackgroundState['originalImage']) => void
  updateRBImageDimensions: (imageDimensions: RemoveBackgroundState['imageDimensions']) => void
}

export type AppActions = GenereateImageActions & ImageTo3dActions & RemoveBackgroundActions

export type AppStore = AppState & AppActions

export const defaultInitState: AppState = {
  generateImageState: {
    formData: {
      prompt: "",
      negative: "",
      steps: 10,
      seed: 0
    },
    result: undefined,
    loading: false
  },

  imageTo3dState: {
    originalImage: undefined,
    result: undefined,
    currentLight: 0,
    loading: false
  },

  removeBackgroundState: {
    originalImage: undefined,
    result: undefined,
    loading: false,
    imageDimensions: {
      width: 300,
      height:300
    }
  }
}

export const createAppStore = ( initState: AppState = defaultInitState ) => {
  return createStore<AppStore>()((set) => ({
    ...initState,

    updateResult: (result) => 
      set((state) =>({
        generateImageState: {
          ...state.generateImageState,
          result
        }
    })),
    updateLoading: (loading) => 
      set((state) =>({
        generateImageState: {
          ...state.generateImageState,
          loading
        }
    })),
    updateFormData: (newData) => 
      set((state) =>({
        generateImageState: {
          ...state.generateImageState,
          formData: {
            ...state.generateImageState.formData,
            ...newData
          }
        }
    })),

    update3dResult: (result) => 
      set((state) =>({
        imageTo3dState: { ...state.imageTo3dState, result }
    })),
    update3dLoading: (loading) => 
      set((state) =>({
        imageTo3dState: { ...state.imageTo3dState, loading }
    })),
    updateOriginalImage: (originalImage) => 
      set((state) =>({
        imageTo3dState: { ...state.imageTo3dState, originalImage }
    })),
    updateCurrentLight: (currentLight) =>
      set((state) =>({
        imageTo3dState: { ...state.imageTo3dState, currentLight }
    })),

    upadteRBResult: (result) =>
      set((state) =>({
        removeBackgroundState: { ...state.removeBackgroundState, result }
    })),
    updateRBLoading: (loading) =>
      set((state) =>({
        removeBackgroundState: { ...state.removeBackgroundState, loading }
    })),
    updateRBOriginalImage: (originalImage) =>
      set((state) =>({
        removeBackgroundState: { ...state.removeBackgroundState, originalImage}
    })),
    updateRBImageDimensions: (imageDimensions) =>
      set((state) =>({
        removeBackgroundState: { ...state.removeBackgroundState, imageDimensions }
    }))
  }))
}
