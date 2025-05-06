import ErrorComponent from "@/components/errorComponent"

const notfound = () => {
  return (
    <ErrorComponent message="Page Not Found"
      className="flex h-screen w-full items-center justify-center text-center text-3xl font-semibold text-gray-700" />
  )
}

export default notfound