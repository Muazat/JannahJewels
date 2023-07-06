export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (user.value && !user.value.user_metadata.isInstructor) {
    return navigateTo("/dashboard");
  }
});
