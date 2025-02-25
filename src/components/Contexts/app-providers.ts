import combineComponents from "../utils/combine-components";

import MovieProvider from "./movies/index";

const providers = [MovieProvider];

export const AppContextsProviders = combineComponents(...providers);
