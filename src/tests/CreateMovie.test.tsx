import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, waitFor } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom"; // Fix import
import { expect, test, vi } from "vitest";
import CreateMovie from "../components/CreateMovie/CreateMovie";
import { MemoryRouter } from "react-router";
import { AppContextsProviders } from "../components/Contexts/app-providers";

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await import("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockCreateMovie = vi.fn(({ onSuccess }) => {
  onSuccess();
});

vi.mock("../components/hooks/movie.hook", () => ({
  useMovies: vi.fn(() => ({
    isLoading: false,
    data: { data: [] },
  })),
  useCreateMovie: vi.fn(() => ({
    mutate: mockCreateMovie,
    isPending: false,
    isSuccess: false,
  })),
  useUpdateMovie: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
    isSuccess: false,
  })),
}));

const queryClient = new QueryClient();

test("submits form and calls createMovie when adding a new movie", async () => {
  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AppContextsProviders>
          <CreateMovie />
        </AppContextsProviders>
      </QueryClientProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByTestId("create-movie-form")).toBeInTheDocument();
  });

  fireEvent.change(screen.getByLabelText(/title/i), {
    target: { value: "Test Movie" },
  });
  fireEvent.change(screen.getByLabelText(/genre/i), {
    target: { value: "Action" },
  });
  fireEvent.change(screen.getByLabelText(/release year/i), {
    target: { value: "2024" },
  });
  fireEvent.change(screen.getByLabelText(/language/i), {
    target: { value: "English" },
  });
  fireEvent.change(screen.getByLabelText(/trailer link/i), {
    target: { value: "https://trailer.link" },
  });
  fireEvent.change(screen.getByLabelText(/rating/i), {
    target: { value: "8.5" },
  });
  fireEvent.change(screen.getByLabelText(/description/i), {
    target: { value: "A great movie." },
  });

  const file = new File(["dummy content"], "poster.jpg", {
    type: "image/jpeg",
  });

  fireEvent.change(screen.getByLabelText(/poster/i), {
    target: { files: [file] },
  });

  const form = screen.getByTestId("create-movie-form");
  fireEvent.submit(form);

  await waitFor(() => {
    expect(mockCreateMovie).toHaveBeenCalled();
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/movies");
  });
});

// import "@testing-library/jest-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { expect, test, vi } from "vitest";
// import CreateMovie from "../components/CreateMovie/CreateMovie";
// import { MemoryRouter } from "react-router";
// import { AppContextsProviders } from "../components/Contexts/app-providers";

// const mockNavigate = vi.fn();
// vi.mock("react-router", async () => {
//   const actual = await import("react-router");
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//   };
// });

// const mockCreateMovie = vi.fn(({ onSuccess }) => {
//   onSuccess();
// });

// vi.mock("../components/hooks/movie.hook", () => ({
//   useMovies: vi.fn(() => ({
//     isLoading: false,
//     data: { data: [] },
//   })),
//   useCreateMovie: vi.fn(() => ({
//     mutate: mockCreateMovie,
//     isPending: false,
//     isSuccess: false,
//   })),
//   useUpdateMovie: vi.fn(() => ({
//     mutate: vi.fn(),
//     isPending: false,
//     isSuccess: false,
//   })),
// }));

// const queryClient = new QueryClient();

// test("submits form and calls createMovie when adding a new movie", async () => {
//   render(
//     <MemoryRouter>
//       <QueryClientProvider client={queryClient}>
//         <AppContextsProviders>
//           <CreateMovie />
//         </AppContextsProviders>
//       </QueryClientProvider>
//     </MemoryRouter>
//   );

//   await waitFor(() => {
//     expect(screen.getByTestId("create-movie-form")).toBeInTheDocument();
//   });

//   fireEvent.change(screen.getByLabelText(/title/i), {
//     target: { value: "Test Movie" },
//   });
//   fireEvent.change(screen.getByLabelText(/genre/i), {
//     target: { value: "Action" },
//   });
//   fireEvent.change(screen.getByLabelText(/release year/i), {
//     target: { value: "2024" },
//   });
//   fireEvent.change(screen.getByLabelText(/language/i), {
//     target: { value: "English" },
//   });
//   fireEvent.change(screen.getByLabelText(/trailer link/i), {
//     target: { value: "https://trailer.link" },
//   });
//   fireEvent.change(screen.getByLabelText(/rating/i), {
//     target: { value: "8.5" },
//   });
//   fireEvent.change(screen.getByLabelText(/description/i), {
//     target: { value: "A great movie." },
//   });
//   const file = new File(["dummy content"], "poster.jpg", {
//     type: "image/jpeg",
//   });

//   fireEvent.change(screen.getByLabelText(/poster/i), {
//     target: { files: [file] },
//   });

//   const form = screen.getByTestId("create-movie-form");
//   fireEvent.submit(form);

//   await waitFor(() => {
//     expect(mockCreateMovie).toHaveBeenCalled();
//   });

//   await waitFor(() => {
//     expect(mockNavigate).toHaveBeenCalledWith("/movies");
//   });
// });
