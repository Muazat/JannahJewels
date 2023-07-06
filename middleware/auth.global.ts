export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (!user.value && to.meta?.layout !== "website") {
    return navigateTo("/login");
  }
});
