export default (req) => {
  // console.log(req.url)
  let url = req.url
  $(`.sidebar-menu a[href="#${url}"]`).parent().addClass('active').siblings().removeClass('active')
}