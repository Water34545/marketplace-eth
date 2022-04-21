const COURSES_STATE = {
  0: 'purchased',
  1: 'activated',
  2: 'deactivated'
}

export const normilizedOwnedCourse = web3 => (course, ownedCourse) => ({
  ...course,
  ownedCourseID: ownedCourse.id,
  proof: ownedCourse.proof,
  owned: ownedCourse.owned,
  price: web3.utils.fromWei(ownedCourse.price),
  state: COURSES_STATE[ownedCourse.state]
})