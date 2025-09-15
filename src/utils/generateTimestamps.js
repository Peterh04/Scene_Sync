const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODUwYWY0Mzc0MjU3N2QxMGUwOTA4MTM4YmUwYWRmNSIsIm5iZiI6MTc1NzIzMTU2OS4zMiwic3ViIjoiNjhiZDM5ZDE1Mzg1MDE0NTFiNGU1ZDkzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.dKy_zn9FWtM_p8bGQzoxEl9jSR413i3ZHUbqEaKkpHA",
  },
};

export default async function generateTimestamps(resourceId) {
  const url = `https://api.themoviedb.org/3/movie/${resourceId}`;

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  } catch (err) {
    console.log(err);
  }
}
