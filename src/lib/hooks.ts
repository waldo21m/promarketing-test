import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppState, AppDispatch, AppStore } from './App.store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppStore = useStore.withTypes<AppStore>();
