import "@testing-library/jest-dom";
import { act, render, renderHook } from "@testing-library/react";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import Edit from "@/app/edit/[slug]/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Edit Form", () => {
  beforeEach(async () => {
    render(<Edit params={{ slug: "1" }} />);
  });
  describe("Render", () => {
    it("should render Título input and label", async () => {
      const myTitleLabelElement = screen.getByTestId("title");
      const titleInput = screen.getByLabelText("title");

      expect(titleInput).toBeVisible();
      expect(myTitleLabelElement).toBeInTheDocument();
      expect(myTitleLabelElement).toHaveTextContent("Título");
    });

    it("should render Descrição input and label", async () => {
      const myDescriptionLabelElement = await screen.getByTestId("description");
      const descriptionInput = screen.getByLabelText("description");

      expect(descriptionInput).toBeVisible();
      expect(myDescriptionLabelElement).toBeInTheDocument();
      expect(myDescriptionLabelElement).toHaveTextContent("Descrição");
    });
  });

  describe("Behaviour", () => {
    it("should display two alerts error when title and description are invalid", async () => {
      const registerButton = screen.getByTestId("edit-button");

      fireEvent.submit(registerButton);

      const spanErrorElements = await screen.findAllByRole("alert");

      expect(spanErrorElements).toHaveLength(2);
    });

    it("should submit request successfully", async () => {
      const mockTask = {
        id: "1",
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

      const registerButton = screen.getByTestId("edit-button");
      await act(async () => {
        fireEvent.submit(registerButton);
      });

      const alertElements = screen.queryAllByRole("alert");
      expect(alertElements).toHaveLength(0);
    });
  });
});
