<?php
	use Illuminate\Database\Seeder;
	use Illuminate\Database\Eloquent\Model;
	use App\User;

	class UserTableSeeder extends Seeder{
		public function run(){
			User::create([
				'name'=>'Ryan Chenkie','email'=>'ryanchenkie@gmail.com','password'=>Hash::make('secret'),'api_token'=>str_random(60)
			]);
			User::create([
				'name'=>'Chris Sevilleja','email'=>'chris@scotch.io','password'=>Hash::make('secret'),'api_token'=>str_random(60)
			]);
		}
	}