import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export function useIsFirstRender(): boolean {
    const isFirst = useRef(true)

    if (isFirst.current) {
        isFirst.current = false

        return true
    }

    return isFirst.current
}

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
    const isFirst = useIsFirstRender()

    useEffect(() => {
        console.log(isFirst)
        if (!isFirst) {
            return effect()
        }
    }, deps)
}
