export const PokemonStat = ({ title, value }) => {
  return (
    <p>
      <span className='stateTitle'>{title}</span>
      <div className="progress-bar horizontal">
        <div className="progress-fill"
          style={{
            width: `${value / 2}%`,
          }}
        >
          <span>{value}</span>
        </div>
      </div>
    </p>
  )
}
