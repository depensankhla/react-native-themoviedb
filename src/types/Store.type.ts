export type LoginDetails = {
  email: string;
  password: string;
  selectedLanguage: string;
};

export type Movie = {
  id: number;
  original_title: string;
  poster_path: string;
  title: string;
};

export type MoviePayload = {
  page: number;
  results: Movie[];
};

export type HomeDetails = {
  loading: boolean;
  page: number;
  movies: Movie[];
  error: any;
};
export type HomeScreenViewProps = {
  moviesList: Movie[];
  handleLoadMore: () => void;
};

export type LoginScreenViewProps = {
  email: string;
  password: string;
  isEnglishSelected: boolean;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  validateEmail: (text: string) => boolean;
  validatePassword: (text: string) => boolean;
  handleLogin: () => void;
  changeLanguage: (lang: string) => void;
};

export type RootState = {
  loginDetails: LoginDetails;
  homeDetails: HomeDetails;
};
