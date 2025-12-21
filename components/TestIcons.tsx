export function TestIcons() {
    return (
      <div className="flex gap-4 bg-black p-10">
        {[1,2,3,4,5,6,7].map(n => (
          <img
            key={n}
            src={`/sdgs/${n}.svg`}
            className="w-16 h-16 bg-white rounded"
          />
        ))}
      </div>
    )
  }
  