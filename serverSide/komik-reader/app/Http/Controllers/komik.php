<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class komik extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $komik = DB::table('komik')
        ->select('komik.*')
        ->selectRaw('max(no_chapter) as no_chapter,GROUP_CONCAT(kategori) as kategori')
        ->join('kategori_komik','komik.id','kategori_komik.id_komik','chapter')
        ->join('kategori','kategori_komik.id_kategori','kategori.id')
        ->leftJoin('chapter','komik.id','chapter.id_komik')
        ->groupBy('komik.id')
        ->orderBy('no_chapter','desc')
        ->get();

        $kategori = DB::table('kategori')->get();


        return view('admin.komik.index',compact('komik','kategori'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $kategori = DB::table('kategori')->get();
        return view('admin.komik.create',compact('kategori'));
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'judul' =>'required',
            // 'kategori'=>'required',
            'type'=>'required',
            'status'=>'required',
            'cover'=>'required',
            'penulis'=>'required',
        ]);
        $judul = $request->judul;
        $kategoriCount = count($request->kategori);
        $type = $request->type;
        $status = $request->status;
        $cover = $request->file('cover')->getClientOriginalName();
        $penulis = $request->penulis;
        $keterangan = $request->keterangan;
        
        // dd($request->kategori[]);
        $idKomik =  DB::table('komik')->insertGetId([
            'judul' =>$judul,
            'type'=>$type,
            'status'=>$status,
            'cover'=>$cover,
            'penulis'=>$penulis,
            'keterangan'=>$keterangan
        ]);
        
        for ($i=0; $i <$kategoriCount ; $i++) { 
            DB::table('kategori_komik')->insert([
                'id_kategori'=>(int) $request->kategori[$i],
                'id_komik'=>$idKomik
            ]);
        }
        return redirect('/komik')->with('success','Berhasil Menambah Data');
   
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
         $kategori = DB::table('kategori')->get();
         $data = DB::table('komik')->where($id)->first();
        return view('admin.komik.edit',compact('komik','data'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
         $request->validate([
            'judul' =>'required',
            'kategori'=>'required',
            'type'=>'required',
            'status'=>'required',
            'cover'=>'required',
            'penulis'=>'required',
        ]);

        $judul = $request->judul;
        $kategori = $request->kategori;
        $type = $request->type;
        $status = $request->status;
        $cover = $request->cover;
        $penulis = $request->penulis;

        
        DB::table('komik')->where('id',$id)->update([
            'judul' =>$judul,
            'id_kategori'=>$kategori,
            'type'=>$type,
            'status'=>$status,
            'cover'=>$cover,
            'penulis'=>$penulis
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
