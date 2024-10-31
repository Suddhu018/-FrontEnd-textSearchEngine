import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  Loader2,
  ArrowRight,
  BarChart3,
  Clock,
  BookOpen,
} from "lucide-react";

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));

      const mockSuggestions = [
        `${query} example`,
        `${query} test`,
        `${query} sample`,
        `${query} demo`,
      ];
      setSuggestions(mockSuggestions);
      setIsLoading(false);
    };

    getSuggestions();
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    console.log("Searching for:", searchQuery);
    setSuggestions([]);
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 via-blue-100 via-white via-pink-200 to-pink-100">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536566482680-fca31930a0bd?auto=format&fit=crop&q=80')] opacity-5 bg-fixed bg-center bg-no-repeat bg-cover" />

      <div className="relative min-h-screen flex flex-col items-center px-4">
        <div className="w-full max-w-6xl pt-20 pb-20">
          {/* Header Section */}
          <div className="text-center space-y-6 mb-16">
            <div className="flex justify-center">
              <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-2 rounded-2xl shadow-sm border border-blue-100">
                <span className="text-blue-700 font-medium">
                  Full Text Elastic Search
                </span>
              </div>
            </div>

            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">
              Search Anything
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Experience lightning-fast search with auto suggestions.
            </p>
          </div>

          {/* Search Section */}
          <div className="relative z-10 mx-auto max-w-2xl mb-12">
            <div
              className={`
              group relative bg-white rounded-2xl transition-all duration-300
              ${
                isFocused
                  ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-2 ring-blue-200"
                  : "shadow-lg hover:shadow-xl"
              }
            `}
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="What are you looking for?"
                className="w-full px-8 py-6 pr-32 text-lg rounded-2xl focus:outline-none placeholder:text-gray-400 text-gray-700"
              />

              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                {isLoading && (
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                )}
                {query && !isLoading && (
                  <button
                    onClick={clearSearch}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
                <button
                  onClick={() => handleSearch(query)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-xl text-white 
                           transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl
                           hover:from-blue-600 hover:to-purple-600"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute w-full mt-4 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                    >
                      <button
                        onClick={() => {
                          setQuery(suggestion);
                          handleSearch(suggestion);
                        }}
                        className="w-full px-8 py-4 text-left flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          <span className="text-gray-700 group-hover:text-gray-900">
                            {suggestion}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Popular Searches */}
          <div className="text-center mb-16">
            <div className="inline-flex flex-wrap justify-center gap-2 items-center bg-white/80 px-6 py-3 rounded-2xl shadow-sm">
              <span className="text-sm text-gray-500 mr-2">
                Popular Searches Saved In LRU:
              </span>
              {[
                "Artificial Intelligence",
                "Web Design",
                "Machine Learning",
                "UX Research",
              ].map((term, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(term)}
                  className="px-4 py-1.5 text-sm bg-gradient-to-r from-blue-50 to-purple-50 
                           text-blue-700 rounded-lg hover:from-blue-100 hover:to-purple-100 
                           transition-colors border border-blue-100"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Results and Statistics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
            {/* Results Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium, totam rem aperiam, eaque ipsa quae ab illo
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo.
                </p>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
                Search & Processing Statistics
              </h3>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Doc Reading Time
                    </span>
                    <span className="text-lg font-semibold text-blue-600">
                      0.3s
                    </span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Processing Time
                    </span>
                    <span className="text-lg font-semibold text-blue-600">
                      0.9s
                    </span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Est. Server Response Time
                    </span>
                    <span className="text-lg font-semibold text-blue-600">
                      1.5 s
                    </span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">
                      3500(1.2GB)
                    </div>
                    <div className="text-sm text-gray-600">Total Document</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
