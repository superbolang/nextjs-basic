import Link from 'next/link';

async function fetchGitHubUsers() {
  const res = await fetch('https://api.github.com/search/users?q=greg', {
    next: {
      revalidate: 60,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));
  const json = await res.json();
  return json.items;
}

const GithubUsersPage = async () => {
  const users = await fetchGitHubUsers();
  console.log(users);
  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
            <th>Repos</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className='flex items-center gap-3'>
                  <div className='avatar'>
                    <div className='mask mask-squircle w-12 h-12'>
                      <img src={user.avatar_url} />
                    </div>
                  </div>
                  <div>
                    <div className='font-bold'>{user.login}</div>
                    <div className='text-sm opacity-50'>{user.id}</div>
                  </div>
                </div>
              </td>
              <td>
                <Link href={user.html_url} className='btn btn-link'>
                  View on Github
                </Link>
              </td>
              <th>
                <Link href={`/githubusers/${user.login}`}>Go to repos</Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GithubUsersPage;
