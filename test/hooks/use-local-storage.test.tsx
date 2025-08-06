import { renderHook, act } from "@testing-library/react"
import { useLocalStorage } from "@/shared/hooks/use-local-storage"
import { vi } from "vitest"

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
  })

  it("returns initial value when localStorage is empty", () => {
    localStorageMock.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useLocalStorage("test-key", "initial-value"))

    expect(result.current[0]).toBe("initial-value")
  })

  it("returns stored value from localStorage", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify("stored-value"))

    const { result } = renderHook(() => useLocalStorage("test-key", "initial-value"))

    expect(result.current[0]).toBe("stored-value")
  })

  it("updates localStorage when value changes", () => {
    localStorageMock.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useLocalStorage("test-key", "initial-value"))

    act(() => {
      result.current[1]("new-value")
    })

    expect(localStorageMock.setItem).toHaveBeenCalledWith("test-key", JSON.stringify("new-value"))
    expect(result.current[0]).toBe("new-value")
  })
})
