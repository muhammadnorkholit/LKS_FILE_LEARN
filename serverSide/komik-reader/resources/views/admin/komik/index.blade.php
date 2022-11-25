@extends('template.template')



@section('content')
    <div class="p-2">
        <div class="bg-white mb-4 p-3 rounded-2 filter-card d-flex align-items-center ">
            <form action="" class="d-flex gap-3 w-100" method="post">
                <select name="" class="form-control shadow-none" id="">
                    <option value="">Categori</option>
                    @foreach ($kategori as $k)
                        <option value="{{ $k->id }}">{{ $k->kategori }}</option>
                    @endforeach
                </select>

                <button class="btn btn-success px-5">Filter</button>
            </form>
            {{-- <input type="text" class="form-control shadow-none" name="" id=""> --}}
        </div>
        <div class="bg-white p-4 rounded-2">
            <a href="/komik/create" class="btn btn-success mb-4">Tambah Komik</a>
            <table class=" table">
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Judul</th>
                        <th>penulis</th>
                        <th>Gendre</th>
                        <th>type</th>
                        <th>Total Chapter</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($komik as $k)
                        <tr>
                            <td><img src="" class="img-fluid" alt=""></td>
                            <td>{{ $k->judul }}</td>
                            <td>{{ $k->penulis }}</td>
                            <td>{{ $k->kategori }}</td>
                            <td>{{ $k->type }}</td>
                            <td>{{ $k->no_chapter }} chapter</td>
                            <td>
                                <a href="/komik/{{ $k->id }}" class="btn btn-success">Detail</a>
                                <a href="" class="btn btn-danger">Hapus</a>
                                <a href="" class="btn btn-success">Edit</a>
                            </td>
                        </tr>
                    @endforeach

                </tbody>
            </table>
        </div>
    </div>
@endsection
