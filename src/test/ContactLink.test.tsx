import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import ContactLink, { type ContactItem } from "@/components/ContactLink";
import { LuMail } from "react-icons/lu";
import { IoLogoGithub } from "react-icons/io";

const email: ContactItem = {
  icon: LuMail,
  label: "Email",
  value: "motokaushik@gmail.com",
  href: "mailto:motokaushik@gmail.com",
  actionLabel: "Compose",
  behavior: "copy",
};

const github: ContactItem = {
  icon: IoLogoGithub,
  label: "GitHub",
  value: "github.com/koushikvarmaJS",
  href: "https://github.com/koushikvarmaJS",
  actionLabel: "Open",
  behavior: "link",
};

const renderLink = (item: ContactItem) =>
  render(
    <TooltipProvider>
      <ContactLink item={item} />
    </TooltipProvider>,
  );

describe("ContactLink", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders email as a button, not a link that fires mailto immediately", () => {
    renderLink(email);
    const trigger = screen.getByRole("button", { name: /Email: motokaushik@gmail.com/ });
    expect(trigger).toBeInTheDocument();
    expect(trigger.tagName).toBe("BUTTON");
  });

  it("reveals the address and a copy button when the email icon is clicked", async () => {
    renderLink(email);

    expect(screen.queryByText("motokaushik@gmail.com")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Email:/ }));

    expect(await screen.findByText("motokaushik@gmail.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
    // The mailto escape hatch is still offered, just no longer automatic.
    expect(screen.getByRole("link", { name: /Compose/ })).toHaveAttribute(
      "href",
      "mailto:motokaushik@gmail.com",
    );
  });

  it("copies the value and confirms it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
    vi.stubGlobal("isSecureContext", true);
    Object.defineProperty(window, "isSecureContext", { value: true, writable: true });

    renderLink(email);

    fireEvent.click(screen.getByRole("button", { name: /Email:/ }));
    fireEvent.click(await screen.findByRole("button", { name: "Copy" }));

    expect(writeText).toHaveBeenCalledWith("motokaushik@gmail.com");
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument(),
    );
  });

  it("keeps GitHub as a direct new-tab link", () => {
    renderLink(github);
    const link = screen.getByRole("link", { name: /GitHub: github.com\/koushikvarmaJS/ });
    expect(link).toHaveAttribute("href", "https://github.com/koushikvarmaJS");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
