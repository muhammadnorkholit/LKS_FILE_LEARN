@extends('template.template')


@section('content')
    <div class="py-4">
        <h4 class="fw-bold">Tambah Komik</h4>
        <div class="card border-0 p-3">
            <form action="/komik" method="post" enctype="multipart/form-data">
                @csrf
                <label for="">Judul</label>
                <input type="text" class="form-control mb-3" name="judul" placeholder="judul" name=""
                    id="">
                <div class="mb-3 row g-4">
                    <div class="col-lg-4"><label for="">Penulis</label>
                        <input type="text" name="penulis" class="form-control" name="" id="">
                    </div>
                    <div class="col-lg-4"><label for="">Status</label>
                        <select name="status" class="form-control" id="">
                            <option value="">Pilih Status</option>
                            <option value="on going">On Going</option>
                            <option value="Complete">Complete</option>
                            <option value="Hiatus">Hiatus</option>
                        </select>
                    </div>

                    <div class="col-lg-4">
                        <label for="">Type</label>
                        <select name="type" class="form-control" id="">
                            <option value="">Pilih Status</option>
                            <option value="manga">manga</option>
                            <option value="manhwa">manhwa</option>
                            <option value="manhua">manhua</option>
                        </select>
                    </div>
                </div>
                <div class="img mb-4 row g-4">
                    <div class="col-lg-6">
                        <label for="">Cover</label>
                        <input type="file" class="form-control" name="cover" id="">
                    </div>

                </div>
                <div class="">
                    <label for="" class="d-block">Kategori</label>
                    @foreach ($kategori as $k)
                        <label for="{{ $k->id }}" class=" user-select-none me-3 d-inline-block"
                            style="cursor: pointer"> <input type="checkbox" name="kategori[]" value="{{ $k->id }}"
                                name="" id="{{ $k->id }}">
                            {{ $k->kategori }}</label>
                    @endforeach

                </div>
                <textarea name="keterangan" class="form-control mb-3" id="" cols="30" rows="5" style="resize: none"></textarea>
                <button class="btn btn-success" type="submit">Simpan</button>
            </form>
        </div>
    </div>
@endsection
