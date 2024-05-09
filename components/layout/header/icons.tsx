import {
  LucideProps,
  Moon,
  SunMedium,
  type Icon as LucideIcon,
} from "lucide-react"
import { siGithub, siX, siNextdotjs } from "simple-icons";

export type Icon = typeof LucideIcon

const renderSVGIcon = ({ path, ...props }: LucideProps & { path: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d={path} />
  </svg>
)

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  x: (props: LucideProps) => renderSVGIcon({ ...props, path: siX.path }),
  logo: (props: LucideProps) => renderSVGIcon({ ...props, path: siNextdotjs.path }),
  gitHub: (props: LucideProps) => renderSVGIcon({ ...props, path: siGithub.path }),
}


