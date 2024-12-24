'use server'


import { signOut } from '@/auth.config'

export async function logout() {
  await signOut({redirectTo: '/'})
}

// Este serve action tiene un pequeño inconveniente cuando se quiere ustilizar en client side, ya que al hacer el logout
// no hace el refresh automatico para que cambien los componentes que dependen del estado de autenticación, por lo que se
// recomienda llamar al metodo signOut de next-auth directamente en el cliente a traves de una función asincrona que haga el logout.
// Como se puede evidenciar en el Sidebar component. De esa manera funciona correctamente.