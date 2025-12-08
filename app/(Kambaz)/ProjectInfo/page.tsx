import Link from "next/link";

export default function ProjectInfo() {
    return (
        <div>
        <h1>Project Info:</h1>
        <h3>Group Members: Claire Stewart</h3>
        <Link href={'https://github.com/clairestewart03/kambaz-next-js'}>Kambaz next js github</Link>
            <br/>
        <Link href={'https://github.com/clairestewart03/kambaz-node-server-app'}>Kambaz node server app github</Link>
        </div>
    )
}