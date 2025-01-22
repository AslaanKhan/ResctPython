import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="bg-blue-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">Welcome to Moreyeahs</h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We specialize in creating random things for random reasons. Because why not?
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Button className="mt-3 sm:mt-0 sm:ml-3" onClick={()=>window.location.pathname = '/login'}>Get Started</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

