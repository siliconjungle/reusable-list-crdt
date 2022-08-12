export const create = () => []

export const findIndex = (list, path) =>
  list.findIndex(
    (path2) =>
      path.length === path2.length &&
      path.every(
        ([key, value], i) => path2[i][0] === key && path2[i][1] === value
      )
  )

export const includes = (list, path) => findIndex(list, path) !== -1

export const push = (list, path) => {
  list.push(path)
  return list.length - 1
}

export const getInsertIndex = (list, path) => {
  if (list.length === 0) {
    return 0
  }

  const index = list.findIndex((path2) => {
    for (let i = 0; i < path.length; i++) {
      if (i > path.length - 1) {
        return false
      }
      if (
        path2[i][0] > path[i][0] ||
        (path2[i][0] === path[i][0] && path2[i][1] > path[i][1])
      ) {
        return true
      }
      return false
    }
  })

  if (index === -1) {
    return list.length
  }

  return index
}

export const insert = (list, insertIndex, path) => {
  list.splice(insertIndex, 0, path)
}

export const remove = (list, insertIndex) => {
  list.splice(insertIndex, 1)
}

export const merge = (list, list2) => {
  for (const path of list2) {
    if (!includes(list, path)) {
      const insertIndex = getInsertIndex(list, path)
      insert(list, insertIndex, path)
    }
  }
  return list
}
