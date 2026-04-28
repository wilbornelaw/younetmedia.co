const chips = ['All', 'Recently uploaded', 'Short clips', 'Long form']

export default function CategoryChips() {
  return (
    <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max gap-3">
        {chips.map((chip, index) => (
          <button
            key={chip}
            type="button"
            className={`rounded-lg px-3 py-2 text-sm font-medium ${
              index === 0
                ? 'bg-[#f1f1f1] text-[#0f0f0f]'
                : 'bg-[#272727] text-[#f1f1f1] hover:bg-[#3f3f3f]'
            }`}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  )
}
