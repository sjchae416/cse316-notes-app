const TagArea = ({ tags }) => {
  return (
    <div>{
      tags.map(() => {

        return (<input value="" />)
      })
    }
    </div>
  )
}

export default TagArea
