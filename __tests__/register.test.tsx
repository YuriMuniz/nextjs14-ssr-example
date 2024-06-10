import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import Register from "@/app/register/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Register Form", () => {
  beforeEach(() => {
    render(<Register />);
  });
  describe("Render", () => {
    it("should render Título input and label", () => {
      const myTitleLabelElement = screen.getByTestId("title");
      const titleInput = screen.getByLabelText("title");

      expect(titleInput).toBeVisible();
      expect(myTitleLabelElement).toBeInTheDocument();
      expect(myTitleLabelElement).toHaveTextContent("Título");
    });

    it("should render Descrição input and label", () => {
      const myDescriptionLabelElement = screen.getByTestId("description");
      const descriptionInput = screen.getByLabelText("description");

      expect(descriptionInput).toBeVisible();
      expect(myDescriptionLabelElement).toBeInTheDocument();
      expect(myDescriptionLabelElement).toHaveTextContent("Descrição");
    });
  });

  describe("Behaviour", () => {
    it("should display two alerts error when title and description are invalid", async () => {
      const registerButton = screen.getByTestId("register-button");

      fireEvent.submit(registerButton);

      const spanErrorElements = await screen.findAllByRole("alert");

      expect(spanErrorElements).toHaveLength(2);
    });

    it("should submit request successfully", async () => {
      const mockTask = {
        id: "123",
        title: "test title",
        description: "test description",
      };

      const titleInput = screen.getByLabelText("title");
      fireEvent.input(titleInput, { target: { value: mockTask.title } });

      const descriptionInput = screen.getByLabelText("description");
      fireEvent.input(descriptionInput, {
        target: { value: mockTask.description },
      });

      expect(titleInput).toHaveValue(mockTask.title);
      expect(descriptionInput).toHaveValue(mockTask.description);

      const registerButton = screen.getByTestId("register-button");
      await act(async () => {
        fireEvent.submit(registerButton);
      });

      const alertElements = screen.queryAllByRole('alert');
      expect(alertElements).toHaveLength(0);
    });
  });
});
